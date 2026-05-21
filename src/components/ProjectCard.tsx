interface ProjectCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
}

export default function ProjectCard({ image, category, title, description }: ProjectCardProps) {
  return (
    <div className="group">
      <div
        className="overflow-hidden"
        style={{
          padding: 8,
          backgroundColor: 'var(--silver-grey)',
          borderRadius: 4,
        }}
      >
        <img
          src={image}
          alt={title}
          className="w-full object-cover transition-transform duration-400 group-hover:scale-[1.03]"
          style={{ aspectRatio: '4/3', display: 'block' }}
        />
      </div>
      <p
        className="font-sans uppercase mt-4"
        style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--muted-text)' }}
      >
        {category}
      </p>
      <h3
        className="font-serif mt-2"
        style={{ fontSize: '1.25rem', color: 'var(--charcoal)' }}
      >
        {title}
      </h3>
      <p
        className="font-sans mt-2"
        style={{ fontSize: '0.875rem', color: 'var(--muted-text)' }}
      >
        {description}
      </p>
    </div>
  );
}
