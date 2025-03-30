import { useEffect, useState } from "react";
// import { io } from "socket.io";

// const socket = io("http://localhost:5000");

const FreelancerProgress = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            const res = await fetch("http://localhost:5000/api/freelancer/jobs", { credentials: "include" });
            if (res.ok) {
                const data = await res.json();
                setJobs(data);
            }
        };

        fetchJobs();

        // // Listen for real-time updates
        // socket.on("progressUpdated", (update) => {
        //     setJobs((prevJobs) =>
        //         prevJobs.map((job) =>
        //             job._id === update.jobId
        //                 ? {
        //                       ...job,
        //                       milestones: job.milestones.map((m) =>
        //                           m._id === update.milestoneId ? { ...m, status: update.status } : m
        //                       ),
        //                   }
        //                 : job
        //         )
        //     );
        // });

        // return () => socket.off("progressUpdated");
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Applied Jobs</h1>
            {jobs.length === 0 ? <p>No jobs applied yet.</p> : (
                jobs.map((job) => (
                    <div key={job._id} className="card bg-base-100 shadow-md p-4">
                        <h2 className="text-xl font-semibold">{job.title}</h2>
                        <p><strong>Status:</strong> {job.status}</p>

                        {/* Milestones Section */}
                        <h3 className="mt-2 text-lg font-semibold">Milestones</h3>
                        <ul className="list-disc ml-4">
                            {job.milestones.map((milestone) => (
                                <li key={milestone._id} className="text-sm">
                                    {milestone.title} - <span className="text-blue-600">{milestone.status}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default FreelancerProgress;
