import { Content } from "../services/api";

export interface GroupedContent {
  monthYear: string;
  displayDate: string;
  contents: Content[];
}

export const groupContentByMonth = (contents: Content[]): GroupedContent[] => {
  // Group contents by month-year
  const grouped = contents.reduce((acc, content) => {
    const date = new Date(content.createdAt);
    const monthYear = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(content);
    return acc;
  }, {} as Record<string, Content[]>);

  // Convert to array and sort by month (newest first)
  return Object.entries(grouped)
    .map(([monthYear, contents]) => {
      const [year, month] = monthYear.split("-");
      const date = new Date(parseInt(year), parseInt(month) - 1);

      return {
        monthYear,
        displayDate: date.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
        contents: contents.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
      };
    })
    .sort((a, b) => b.monthYear.localeCompare(a.monthYear));
};

export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  }
};

export const formatExactDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
