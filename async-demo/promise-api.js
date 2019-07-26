const p = Promise.reject(new Error("reason for rejection"));
p.catch(err => console.log(err));
