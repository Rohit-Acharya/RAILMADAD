import connectDB from "../db/db.js";
import Complaints from "../../model/complaint.model.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    // Fetch all complaints
    const allComplaints = await Complaints.find();

    // === Summary stats ===
    const totalProblems = allComplaints.length;

    const problemsResolved = allComplaints.filter(
      (c) => c.status === "Resolved" || c.status === "Closed"
    ).length;

    // Calculate average response time (in hours, for example)
    let totalResponseTime = 0;
    let countWithResponse = 0;

    allComplaints.forEach((c) => {
      if (c.createdAt && c.resolvedAt) {
        const created = new Date(c.createdAt);
        const resolved = new Date(c.resolvedAt);
        const diffHours = (resolved - created) / (1000 * 60 * 60); // ms → hours
        totalResponseTime += diffHours;
        countWithResponse++;
      }
    });

    const averageResponseTime =
      countWithResponse > 0
        ? (totalResponseTime / countWithResponse).toFixed(2)
        : null;

        console.log(allComplaints)

    return NextResponse.json(
      {
        summary: {
          totalProblems,
          problemsResolved,
          averageResponseTime,
        },
        data:allComplaints,
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return NextResponse.json(
      { message: "Error fetching complaints", error: error.message },
      { status: 500 }
    );
  }
}
