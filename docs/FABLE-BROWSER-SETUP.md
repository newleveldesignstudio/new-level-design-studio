# Fable Browser Setup — Windows Chrome Bridge for chrome-devtools MCP

How Claude Code (Fable), running in WSL2, drives the real, signed-in Windows
Chrome instead of a headless Linux browser. Set up and verified Jul 12, 2026.

## Why the old headless browser couldn't access Search Console

The original `chrome-devtools` MCP configuration launched its own Chromium
inside WSL2 with `--headless --isolated` and a pinned Linux Chrome binary.
That browser:

- started with a **fresh, empty profile every session** (`--isolated`), so no
  Google sign-in ever persisted;
- ran **headless on Linux**, so there was no window to sign into interactively,
  and Google's sign-in flow blocks or challenges automated headless browsers;
- was completely separate from the Windows Chrome where
  michaelvail2007@gmail.com is actually signed in.

Search Console requires an authenticated Google session, so every attempt
landed on a signed-out page. The fix: stop launching a browser at all and
attach the MCP to the already-authenticated Windows Chrome over the Chrome
DevTools Protocol (CDP).

## How the Windows Chrome debug profile is configured

Modern Chrome (v136+) refuses remote debugging on the default user profile,
so a dedicated debug profile lives at `C:\ChromeDebug`.

Launch command (Windows PowerShell, regular user):

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --remote-debugging-port=9222 `
  --user-data-dir="C:\ChromeDebug"
```

First-time setup only: sign that Chrome window into michaelvail2007@gmail.com.
The sign-in persists in `C:\ChromeDebug` across launches.

Chrome binds the debug port to `127.0.0.1:9222` on Windows only. WSL2 runs in
NAT mode and sees the Windows host at `192.168.96.1`, so two one-time admin
steps bridge the gap (admin PowerShell):

```powershell
# Forward the WSL-visible interface to Chrome's localhost-only debug port
netsh interface portproxy add v4tov4 `
  listenaddress=192.168.96.1 listenport=9222 `
  connectaddress=127.0.0.1 connectport=9222

# Allow WSL2 traffic through the Windows firewall
New-NetFirewallRule -DisplayName "WSL2 Chrome CDP 9222" `
  -Direction Inbound -Action Allow -Protocol TCP -LocalPort 9222 `
  -RemoteAddress 192.168.96.0/20
```

## How the MCP connects to it

`~/.claude.json` (WSL side) registers the MCP with `--browserUrl` instead of
launch flags, so it attaches to the existing browser rather than spawning one:

```json
"chrome-devtools": {
  "type": "stdio",
  "command": "npx",
  "args": [
    "-y",
    "chrome-devtools-mcp@latest",
    "--browserUrl",
    "http://192.168.96.1:9222",
    "--redact-network-headers"
  ],
  "env": {}
}
```

The pre-fix config is backed up at `~/.claude.json.bak-20260712-084500`.
Claude Code must be restarted after any change to this block.

## Verification steps (run before starting browser work)

1. **CDP endpoint answers** (from WSL):

   ```bash
   curl http://192.168.96.1:9222/json/version
   ```

   Expect JSON with `"Browser": "Chrome/1xx..."` and a
   `User-Agent` containing **Windows NT** — that confirms it's the Windows
   Chrome, not a leftover Linux one.

2. **MCP sees the browser**: call `list_pages` — it should return the tabs
   open in the visible Windows Chrome window.

3. **Signed-in session**: navigate a tab to `https://myaccount.google.com/`.
   It should load the account dashboard for michaelvail2007@gmail.com with no
   sign-in redirect. Only then start Search Console (or other authenticated)
   work.

## Troubleshooting after a reboot

The netsh portproxy and firewall rule persist across reboots; the Chrome
process and (sometimes) the WSL host IP do not. Work down this list:

1. **`curl .../json/version` fails: connection refused.**
   Chrome isn't running with the debug port. Relaunch it with the PowerShell
   command above. A normally-launched Chrome (taskbar icon) does NOT open
   port 9222 — it must be started with the flags. Also make sure no other
   Chrome instance is already using `C:\ChromeDebug`.

2. **Still refused with Chrome running.**
   The portproxy may have been cleared. Check on Windows:
   `netsh interface portproxy show v4tov4` — if empty, re-add it (command
   above). Verify Chrome itself is listening:
   `curl http://127.0.0.1:9222/json/version` from Windows.

3. **Timeout instead of refusal.**
   Firewall. Confirm the "WSL2 Chrome CDP 9222" inbound rule exists and is
   enabled.

4. **Windows host IP changed.**
   WSL2's NAT subnet can change after a reboot or `wsl --shutdown`. Get the
   current host IP from WSL: `ip route show default | awk '{print $3}'`.
   If it's no longer `192.168.96.1`, update all three places to match:
   the netsh `listenaddress`, the firewall `RemoteAddress` subnet, and the
   `--browserUrl` in `~/.claude.json` (then restart Claude Code).

5. **curl works but MCP tools fail.**
   The MCP server cached a dead connection. Restart Claude Code so the MCP
   reconnects. If it persists, check that nothing pinned an old
   `chrome-devtools-mcp` version (`npx -y chrome-devtools-mcp@latest` is
   expected).

6. **Pages load but Google is signed out.**
   The debug profile lost its session (or the wrong `--user-data-dir` was
   used). Sign in again in the visible window — it's a real Chrome, so just
   log in once and it persists.
