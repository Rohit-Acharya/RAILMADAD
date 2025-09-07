import connectDB from "../db/db.js";
import Complaints from "../../model/complaint.model.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    // Fetch all complaints
   const allComplaints = await Complaints.find().sort({ createdAt: -1 });


    // === Summary stats ===
    const totalProblems = allComplaints.length;
const problemsResolved = allComplaints.filter(c => c.resolved === true).length;

    console.log("Problems resolved:", problemsResolved);

    let totalResolutionTime = 0;
    // console.log(allComplaints.resolutionTimeMinutes)

    // Sum up all resolution times (in minutes)
    allComplaints.forEach((c) => {
      if (c.resolutionTimeMinutes) {
        totalResolutionTime += c.resolutionTimeMinutes;
      }
    });

    console.log("Total resolution time (minutes):", totalResolutionTime);

    // Average over **all complaints**, including those with 0 resolution time
    const averageResolutionTime =
      allComplaints.length > 0
        ? (totalResolutionTime / allComplaints.length).toFixed(2)
        : null;

    console.log("Average resolution time (minutes):", averageResolutionTime);

    // console.log(allComplaints);

    return NextResponse.json(
      {
        summary: {
          totalProblems,
          problemsResolved,
          averageResolutionTime,
        },
        data: allComplaints,
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
