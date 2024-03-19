interface HeaderProps {
  title: string
  subtitle?: string
}

function Header({ title, subtitle }: HeaderProps) {
  return (
    <>
      <h2 className="h2-bold">{title}</h2>

      {subtitle && (
        <p className="p-16-regular mt-4 text-muted-foreground">{subtitle}</p>
      )}
    </>
  )
}

export default Header
