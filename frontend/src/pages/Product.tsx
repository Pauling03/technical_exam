import DataTable from "../components/DataTable";
import Header from "../layouts/Header";

const Home = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Products</h1>

        {/* <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Products</h1>
        </div> */}
        <DataTable />
      </main>
    </>
  );
};

export default Home;
