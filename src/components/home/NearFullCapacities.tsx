import GatheringCard from '@/components/gathering/GatheringCard';

interface GatheringListProps {
  gatherings: any;
}

export default function NearFullCapacities({ gatherings }: GatheringListProps) {
  return (
    <section className="grid h-full w-full grid-cols-1 grid-rows-2 gap-4 md:gap-7 xl:grid-cols-2 xl:grid-rows-2 xl:gap-9">
      {gatherings.map((gathering: any) => (
        <GatheringCard key={gathering.gatheringId} {...gathering} />
      ))}
    </section>
  );
}
