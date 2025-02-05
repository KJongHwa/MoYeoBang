// import { ReactNode } from 'react';

// interface UseLoadingStateProps<T> {
//   data: T | undefined;
//   isLoading: boolean;
//   emptyMessage: string;
//   children: (data: T) => ReactNode;
// }

// export function useLoadingState<T>({
//   data,
//   isLoading,
//   emptyMessage,
//   children,
// }: UseLoadingStateProps<T>) {
//   if (isLoading) {
//     return (
//       <div className="flex h-dvh items-center justify-center"> Loading... </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="flex h-dvh items-center justify-center">
//         모임 정보를 불러올 수 없습니다.
//       </div>
//     );
//   }

//   if (data.length === 0) {
//     return <div className="flex h-dvh items-center justify-center">{emptyMessage}</div>;
//   }

//   return children(data);
// }
