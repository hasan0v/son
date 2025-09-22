interface SectionProps {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
  id?: string
}

export default function Section({ children, className = '', title, description, id }: SectionProps) {
  return (
    <section id={id} className={`py-10 ${className}`}>
      <div className="container mx-auto px-4">
        {title && (
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-headline text-gray-900 mb-2">
              {title}
            </h2>
            {description && (
              <p className="font-body text-gray-600">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}