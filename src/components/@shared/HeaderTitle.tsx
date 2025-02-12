import clsx from 'clsx';

interface HeaderTitleProps {
  title?: string;
  h1: string;
  content?: string;
  order?: 'inverse';
}

export default function HeaderTitle({
  h1,
  title,
  content,
  order,
}: HeaderTitleProps) {
  return (
    <>
      <title>{`모여방 | ${title || h1}`}</title>
      <header className="flex flex-col gap-2">
        <h1
          className={clsx('text-2xl font-semibold', {
            'order-2': order === 'inverse',
          })}
        >
          {h1}
        </h1>
        <p
          className={clsx('text-sm font-medium', {
            'order-1': order === 'inverse',
          })}
        >
          {content}
        </p>
      </header>
    </>
  );
}
