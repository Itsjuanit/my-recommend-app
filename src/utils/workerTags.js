export function getWorkerTagLabel(worker, fallback = "") {
  if (worker.tag) return worker.tag;
  if (worker.tags?.length) return worker.tags.join(", ");
  return fallback;
}
