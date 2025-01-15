interface HeaderTitleProps {
  title: string;
  content: string;
}

export default function HeaderTitle({ title, content }: HeaderTitleProps) {
  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-sm font-medium">{content}</p>
    </header>
  );
}
