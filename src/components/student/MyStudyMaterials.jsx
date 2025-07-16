import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import { apiRequiestWithCredentials } from '../../utilities/handleApis';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Loader from '../../additionals/Loader';
import Fetching from '../../additionals/Fetching';
import { Helmet } from 'react-helmet';

const MyStudyMaterials = () => {
    const {sessionId}=useParams();
    const state = useLocation();
    const [materials,setMaterials]=useState([])

    // get all notes created by student
  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: ["materials"],
    queryFn: () => apiRequiestWithCredentials("get", `/materials/student/${sessionId}`),
    refetchOnWindowFocus: true,
    refetchOnMount: 'always'
  });



  // Update state when data changes
    useEffect(() => {
      if (data?.materials) {
        setMaterials(data.materials);
      }
    }, [data]);
   
    // Handle error toast outside render
      useEffect(() => {
        if (isError) {
          toast.error(error?.response?.data?.message || "Failed to fetch notes");
        }
      }, [isError, error]);

       
       

   


    const handleDownload = (imageUrl, filename = `${state?.state}.jpg`) => {
    fetch(imageUrl, { mode: "cors" })
      .then((res) => res.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(() => alert("Failed to download image."));
  };

    // load page when data fateching 
  if (isPending || !data) {
    return <Loader />;
  }

  return (
  <>  
  <Helmet>
        <title>NexLearn | Materials</title>
      </Helmet>
  
  <div className='max-w-7xl px-4 mx-auto py-10 min-h-[60vh]'>
  
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Materials for: {state?.state}
            </h3>

            {
            isFetching ? <Fetching /> :  materials.length === 0 ?
            <div className="w-full flex justify-center items-center">
        <p className="text-gray-600 mt-10">You haven’t materials yet.</p>
        </div>
            :<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials?.map((mat) => (
                <div
                  key={mat._id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col justify-between"
                >
                  <img
                    src={mat?.image}
                    alt="Material"
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                  <div className="flex justify-between gap-3">
                    <a
                      href={mat?.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm"
                    >
                      Visit Link
                    </a>
                    <button
                      onClick={() => handleDownload(mat?.image, `${mat?._id}.jpg`)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded text-sm"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div> }
          </div>
    </div></>
  )
}

export default MyStudyMaterials
