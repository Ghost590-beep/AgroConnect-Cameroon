// utils/formatDate.ts

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatMemberSince = (dateString?: string): string => {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};