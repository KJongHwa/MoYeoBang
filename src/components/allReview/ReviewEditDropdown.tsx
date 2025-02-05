// import Image from 'next/image';
// import { useState } from 'react';
// import MyReviewModal from '@/components/mypage/myReviewModal';
// import DeleteModal from '@/components/mypage/deleteModal';

// interface ReviewEditDropdownProps {
//   comment: string;
//   score: number;
// }

// export default function ReviewEditDropdown({
//   comment,
//   score,
// }: ReviewEditDropdownProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isEditModal, setEditIsModal] = useState(false);
//   const [isDeleteModal, setDeleteIsModal] = useState(false);
//   const openEditModalHandler = () => {
//     setEditIsModal(true);
//     setIsOpen(false);
//   };
//   const openDeleteModalHandler = () => {
//     setDeleteIsModal(true);
//     setIsOpen(false);
//   };
//   const handleChange = () => {
//     setIsOpen((prevState) => !prevState);
//   };

//   const liDropdowns = [
//     { label: '수정하기', clickHandler: openEditModalHandler },
//     { label: '삭제하기', clickHandler: openDeleteModalHandler },
//   ];

//   return (
//     <div className="absolute right-[25px]">
//       <Image
//         src="/see_more_icon.png"
//         width={24}
//         height={24}
//         alt="드롭다운 클릭 버튼"
//         className="cursor-pointer"
//         onClick={handleChange}
//       />
//       <ul
//         className={`${isOpen ? '' : 'hidden'} absolute right-0 z-50 mt-2 w-32 rounded-md bg-secondary-80 shadow-md`}
//       >
//         {liDropdowns.map((liDropdown) => (
//           <li key={liDropdown.label}>
//             <button
//               onClick={liDropdown.clickHandler}
//               type="button"
//               className="w-full px-4 py-2 text-left hover:rounded-md hover:bg-secondary-60"
//             >
//               {liDropdown.label}
//             </button>
//           </li>
//         ))}
//       </ul>
//       <MyReviewModal
//         isModal={isEditModal}
//         setIsModal={setEditIsModal}
//         comment={comment}
//         score={score}
//       />
//       <DeleteModal
//         isModal={isDeleteModal}
//         setIsModal={setDeleteIsModal}
//         classification="delete"
//       />
//     </div>
//   );
// }
