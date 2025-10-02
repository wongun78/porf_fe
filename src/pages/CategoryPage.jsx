import CategoryTable from "../components/categories/CategoryTable";

const CategoryPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] pointer-events-none blur-3xl"></div>

      <div className="">
        <CategoryTable />
      </div>
    </div>
  );
};
export default CategoryPage;
