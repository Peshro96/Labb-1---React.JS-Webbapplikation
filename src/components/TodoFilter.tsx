// Tillåtna filtervärden - importeras egentligen från App men dupliceras här för enkelhet
type Filter = "all" | "done" | "undone";

type TodoFilterProps = {
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
};

// Knappar för att filtrera listan av todos
export default function TodoFilter({
  currentFilter,
  onFilterChange,
}: TodoFilterProps) {
  // Stil för aktiv knapp - markeras med fetare text och annan bakgrund
  const buttonStyle = (isActive: boolean) => ({
    marginRight: "0.5rem",
    padding: "0.4rem 0.8rem",
    fontWeight: isActive ? "bold" : "normal",
    backgroundColor: isActive ? "#ddd" : "#fff",
    cursor: "pointer",
  });

  return (
    <div style={{ marginBottom: "1rem" }}>
      <button
        onClick={() => onFilterChange("all")}
        style={buttonStyle(currentFilter === "all")}
      >
        Alla
      </button>

      <button
        onClick={() => onFilterChange("undone")}
        style={buttonStyle(currentFilter === "undone")}
      >
        Oklara
      </button>

      <button
        onClick={() => onFilterChange("done")}
        style={buttonStyle(currentFilter === "done")}
      >
        Klara
      </button>
    </div>
  );
}