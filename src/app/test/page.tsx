import Button from '@/components/@shared/Button';

export default function Test() {
  return (
    <main className="m-10 flex flex-col items-center gap-8">
      <h1>공통 컴포넌트 테스트 페이지</h1>
      <section className="w-full text-center">
        <h2>버튼</h2>
        <ul>
          <h3>variant="primary"</h3>
          <li className="my-2 flex">
            <Button variant="primary" size="small" font="14">
              생성하기
            </Button>
            <Button variant="primary" size="large">
              생성하기
            </Button>
            <Button variant="primary" disabled={true}>
              비활성화
            </Button>
          </li>
          <h3>variant="secondary"</h3>
          <li className="my-2 flex">
            <Button variant="secondary" size="small" font="14">
              생성하기
            </Button>
            <Button variant="secondary" size="large">
              생성하기
            </Button>
            <Button variant="secondary" disabled={true}>
              비활성화
            </Button>
          </li>
        </ul>
      </section>
    </main>
  );
}
