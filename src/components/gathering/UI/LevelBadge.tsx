import GatheringBadge from './GatheringBadge';

interface LevelBadgeProps {
  level: string;
  children?: React.ReactNode;
}

export default function LevelBadge({ level, children }: LevelBadgeProps) {
  return (
    <GatheringBadge
      icon={level as 'high' | 'middle' | 'low'}
      variant="secondary"
      shape="round"
      border="primary"
      fontColor="primary"
    >
      {children}
    </GatheringBadge>
  );
}
