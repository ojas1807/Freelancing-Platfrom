                    <label
                      htmlFor="proposal-bid"
                      className="text-sm font-medium"
                    >
                      Your Bid
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">₹</span>
                      <input
                        id="proposal-bid"
                        type="number"
                        placeholder="Amount"
                        min="1"
                        step="0.01"
                        className="w-full py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        required
                      />
                    </div> 