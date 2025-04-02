export const getInitials = (fullName?: string | null): string => {
  if (!fullName) return '';

  const names = fullName.split(' ');
  if (names.length < 2) return '';

  const firstInitial = names[0]?.charAt(0).toUpperCase();
  const lastInitial = names[names.length - 1]?.charAt(0).toUpperCase();

  return `${firstInitial}${lastInitial}` || fullName;
};
