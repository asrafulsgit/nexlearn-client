import { useState } from "react";

const bookedSessions = [
  {
    id: "s1",
    title: "React Fundamentals",
    image:
      "https://images.unsplash.com/photo-1685599504130-9ee12eef06eb?crop=entropy&q=80&w=1080",
  },
  {
    id: "s2",
    title: "Data Structures",
    image:
      "https://images.unsplash.com/photo-1701170645257-8345722edf47?crop=entropy&q=80&w=1080",
  },
];

const materials = {
  s1: [
    {
      id: "m1",
      image:
        "https://images.unsplash.com/photo-1573496267526-08a69e46a409?auto=format&fit=crop&w=500&q=60",
      link: "https://drive.google.com/react-fundamentals",
    },
    {
      id: "m2",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=500&q=60",
      link: "https://drive.google.com/react-hooks",
    },
  ],
  s2: [
    {
      id: "m3",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=60",
      link: "https://drive.google.com/dsa-overview",
    },
  ],
};

const StudyMaterials = () => {
  const [activeSessionId, setActiveSessionId] = useState(null);

  const handleDownload = (imageUrl, filename = "study-material.jpg") => {
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

  return (
    <section className="px-6 py-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Study Materials
        </h2>
        <p className="text-gray-600 mb-8">
          Select one of your booked sessions to view its study materials.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {bookedSessions.map((session) => (
            <div
              key={session.id}
              className={`bg-white rounded-lg shadow p-4 border border-gray-200 hover:shadow-md transition ${
                activeSessionId === session.id ? "ring-2 ring-green-500" : ""
              }`}
            >
              <img
                src={session.image}
                alt={session.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {session.title}
              </h3>
              <button
                onClick={() => setActiveSessionId(session.id)}
                className="mt-3 text-sm text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition"
              >
                View Materials
              </button>
            </div>
          ))}
        </div>

        {activeSessionId && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Materials for:{" "}
              {bookedSessions.find((s) => s.id === activeSessionId)?.title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials[activeSessionId]?.map((mat) => (
                <div
                  key={mat.id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col justify-between"
                >
                  <img
                    src={mat.image}
                    alt="Material"
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                  <div className="flex justify-between gap-3">
                    <a
                      href={mat.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm"
                    >
                      Visit Link
                    </a>
                    <button
                      onClick={() => handleDownload(mat?.image, `${mat.id}.jpg`)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded text-sm"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
              {materials[activeSessionId]?.length === 0 && (
                <p className="text-gray-500 col-span-full">
                  No materials found.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudyMaterials;
