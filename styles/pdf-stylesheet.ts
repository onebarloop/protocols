const HTMLSTYLESHEET = {
  ul: {
    listStyleType: 'disc',
    paddingLeft: 20,
  },
  ol: {
    listStyleType: 'decimal',
    paddingLeft: 20,
  },
  h1: { fontSize: 24, marginBottom: 10, fontWeight: 'normal' },
  h2: { fontSize: 20, marginBottom: 10, fontWeight: 'normal' },
  h3: { fontSize: 18, marginBottom: 10, fontWeight: 'normal' },
} as const;

export default HTMLSTYLESHEET;
