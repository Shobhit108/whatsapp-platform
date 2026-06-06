import Header from "../components/common/Header";

const MainLayout = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Header />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-5">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;