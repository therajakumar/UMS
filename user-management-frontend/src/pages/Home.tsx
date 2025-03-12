import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to CMS
        </h1>
        <p className="text-lg text-gray-600">
          Upload and manage your images with ease
        </p>
      </motion.div>

      <Card className="mt-8 w-full max-w-md shadow-lg">
        <CardContent className="p-6 flex flex-col items-center">
          <Button
            onClick={() => {
              navigate("/photos");
            }}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
