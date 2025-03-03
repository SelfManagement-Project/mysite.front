import Footer from "@/components/common/Footer";

const DashboardPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Grafana Dashboard</h1>
      <iframe
        src="http://localhost:3000/goto/lJbVFApHR?orgId=1"
        width="100%"
        height="600px"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <Footer />
    </div>
  );
};

export default DashboardPage;
