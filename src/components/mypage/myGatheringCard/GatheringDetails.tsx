// import { mockGatherings } from '@/data/mockGatherings';
// import MyGatheringCard from '../myGatheringCard';
// import GatheringBadge from '@/components/gathering/GatheringBadge';
// import Button from '@/components/@shared/Button';
// import { formatDate } from '@/utils/dateUtils';
// import Image from 'next/image';
// import { useState } from 'react';
// import MyReviewModal from '../myReviewModal';

// export default function MyGathering() {
//   const [isEditModal, setEditIsModal] = useState(false);

//   const openEditModalHandler = () => {
//     setEditIsModal(true);
//   };

//   return (
//     <div className="flex flex-col gap-5">
//       {mockGatherings.map((gathering) => (
//         <MyGatheringCard
//           key={gathering.gatheringId}
//           image={gathering.image}
//           altText={gathering.themeName}
//         >
//           {/* children으로 전달되는 내용 */}
//           <div className="flex justify-between">
//             <div className="flex items-center gap-1 text-sm md:gap-[6px]">
//               <GatheringBadge variant="secondary">
//                 {gathering.location}
//               </GatheringBadge>
//               <GatheringBadge variant="tertiary">
//                 {new Date(gathering.dateTime) > new Date()
//                   ? '모임 예정'
//                   : '모임 완료'}
//               </GatheringBadge>
//               <GatheringBadge variant="primary">
//                 {gathering.participantCount === gathering.capacity ? (
//                   <span>
//                     <Image
//                       src="/check.png"
//                       width={16}
//                       height={16}
//                       alt="체크 이미지"
//                     />
//                     일정 확정
//                   </span>
//                 ) : (
//                   '일정 미확정'
//                 )}
//               </GatheringBadge>
//             </div>
//           </div>
//           <div>
//             <p className="text-sm font-semibold md:text-lg">{gathering.name}</p>
//             <p className="text-xs font-light md:text-sm">
//               {gathering.themeName}
//             </p>
//           </div>
//           <div className="flex flex-col gap-1">
//             <div className="text-text-secondary flex items-center gap-1 text-[10px] md:text-sm">
//               <p>{formatDate(gathering.dateTime)}</p>
//               <p>.</p>
//               <Image
//                 src="/gathering_icon.png"
//                 width={20}
//                 height={20}
//                 alt="모임 아이콘"
//               />
//               <p>
//                 {gathering.participantCount}/{gathering.capacity}
//               </p>
//               <Button
//                 variant="secondary"
//                 size="small"
//                 font="14"
//                 onClick={() => openEditModalHandler()}
//                 style={{
//                   position: 'absolute',
//                   right: '10px',
//                 }}
//               >
//                 리뷰쓰기
//               </Button>
//               <MyReviewModal
//                 isModal={isEditModal}
//                 setIsModal={setEditIsModal}
//               />
//             </div>
//           </div>
//         </MyGatheringCard>
//       ))}
//     </div>
//   );
// }
