import { Button } from "../ui/button";

export const DatePickerWithToday = ({ field }: { field: any }) => {
  const setToday = () => {
    field.onChange(new Date().toISOString().split("T")[0]);
  };

  return (
    <div className="flex space-x-2">
      <input
        type="date"
        value={field.value || ""}
        onChange={(e) => field.onChange(e.target.value)}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <Button type="button" onClick={setToday} variant="outline">
        Today
      </Button>
    </div>
  );
};
