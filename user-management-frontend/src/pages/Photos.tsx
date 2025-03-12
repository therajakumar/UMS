import type React from "react";

import { useState, useEffect } from "react";
import { ImageService } from "@/utils/image-service";
import UploadModal from "../components/UploadModal";
import { AuthService } from "@/services/auth-services";

interface Image {
  _id: string;
  name: string;
  key: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ImageResponse {
  success: boolean;
  page: number;
  pageSize: number;
  totalImages: number;
  totalPages: number;
  images: Image[];
}

const Photos = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const { data, error } = await ImageService.getImages<ImageResponse>({
          page,
          pageSize,
        });

        if (data) {
          setImages(data.images);
          setTotalPages(data.totalPages);
        }

        if (error) {
          if (error.status === 401) {
            window.location.href = "/login";
          }
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [page, pageSize]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLogout = async () => {
    await AuthService.logout();
    window.location.href = "/login";
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(Number(event.target.value));
    setPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Photo Gallery</h1>
        <div className="space-x-1">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Upload Image
          </button>
          <button
            onClick={() => handleLogout()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading images...</p>
        </div>
      ) : images.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">
            No images found. Upload some images to get started!
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image) => (
              <div
                key={image._id}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}/${image.key}`}
                  alt={image.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium truncate">{image.name}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(image.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <label htmlFor="pageSize" className="mr-2">
                Items per page:
              </label>
              <select
                id="pageSize"
                value={pageSize}
                onChange={handlePageSizeChange}
                className="border rounded-md px-2 py-1"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="flex items-center">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 border rounded-md mr-2 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="mx-2">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-1 border rounded-md ml-2 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          // Refresh the images
          setPage(1);
        }}
      />
    </div>
  );
};

export default Photos;
