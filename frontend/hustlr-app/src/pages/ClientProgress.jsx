import { useEffect, useState } from "react";


const updateMilestoneStatus = async (jobId, milestoneId, status) => {
    const res = await fetch(`http://localhost:5000/api/jobs/${jobId}/milestone/${milestoneId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
    });

    if (res.ok) {
        console.log("Milestone updated!");
    } else {
        console.error("Failed to update milestone");
    }
};

const ClientProgress = () => {
    const [freelancers, setFreelancers] = useState([]);

    useEffect(() => {
        const fetchFreelancers = async () => {
            const res = await fetch("http://localhost:5000/api/client/freelancers", { credentials: "include" });
            if (res.ok) {
                const data = await res.json();
                setFreelancers(data);
            }
        };

        fetchFreelancers();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Hired Freelancers</h1>
            {freelancers.length === 0 ? <p>No freelancers hired yet.</p> : (
                freelancers.map((freelancer) => (
                    <div key={freelancer._id} className="card bg-base-100 shadow-md p-4">
                        <h2 className="text-xl font-semibold">{freelancer.name}</h2>

                        <h3 className="mt-2 text-lg font-semibold">Milestones</h3>
                        <ul className="list-disc ml-4">
                            {freelancer.milestones.map((milestone) => (
                                <li key={milestone._id} className="text-sm">
                                    {milestone.title} - <span className="text-blue-600">{milestone.status}</span>
                                    {milestone.status !== "Completed" && (
                                        <button
                                            className="ml-2 btn btn-sm btn-primary"
                                            onClick={() => updateMilestoneStatus(freelancer._id, milestone._id, "Completed")}
                                        >
                                            Mark as Completed
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default ClientProgress;
