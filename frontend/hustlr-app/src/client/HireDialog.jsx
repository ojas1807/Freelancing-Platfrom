"use client";
import { useState } from 'react';
import { Check, DollarSign, List } from 'lucide-react';

const HireDialog = ({ 
  job, 
  proposal, 
  onClose, 
  onHire 
}) => {
  const [milestones, setMilestones] = useState([
    { name: 'Initial Delivery', amount: proposal.bidAmount * 0.5, dueDate: '' },
    { name: 'Final Delivery', amount: proposal.bidAmount * 0.5, dueDate: '' }
  ]);
  const [startDate, setStartDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onHire({
      startDate,
      milestones: milestones.map(m => ({
        ...m,
        dueDate: new Date(m.dueDate).toISOString()
      }))
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Hire {proposal.freelancer.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Proposal Details</h3>
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-4 w-4" />
              <span>Bid: ${proposal.bidAmount}</span>
            </div>
            <div className="flex items-center gap-2">
              <List className="h-4 w-4" />
              <span>Timeline: {proposal.estimatedTime}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Project Start Date *
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Payment Milestones
                </label>
                <div className="space-y-3">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={milestone.name}
                        onChange={(e) => {
                          const newMilestones = [...milestones];
                          newMilestones[index].name = e.target.value;
                          setMilestones(newMilestones);
                        }}
                        className="flex-1 p-2 border rounded"
                        required
                      />
                      <input
                        type="number"
                        value={milestone.amount}
                        onChange={(e) => {
                          const newMilestones = [...milestones];
                          newMilestones[index].amount = parseFloat(e.target.value);
                          setMilestones(newMilestones);
                        }}
                        className="w-24 p-2 border rounded"
                        required
                        min="0"
                        step="0.01"
                      />
                      <input
                        type="date"
                        value={milestone.dueDate}
                        onChange={(e) => {
                          const newMilestones = [...milestones];
                          newMilestones[index].dueDate = e.target.value;
                          setMilestones(newMilestones);
                        }}
                        className="w-32 p-2 border rounded"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                >
                  <Check className="inline mr-2 h-4 w-4" />
                  Confirm Hire
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HireDialog;