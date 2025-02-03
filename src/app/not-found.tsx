import ErrorPage from './error';

export default function NotFound() {
  return (
    <ErrorPage
      errorCode="404"
      errorMessage="요청하신 페이지가 존재하지 않습니다."
    />
  );
}
