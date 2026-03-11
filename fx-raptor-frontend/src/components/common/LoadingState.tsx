import { LoadingSpinner } from "@/components/common/LoadingSpinner";

type LoadingStateProps = {
  minHeightClassName?: string;
};

export function LoadingState({ minHeightClassName = "min-h-48" }: LoadingStateProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-[2rem] border border-slate-200 bg-white shadow-sm ${minHeightClassName}`}
    >
      <LoadingSpinner />
    </div>
  );
}
