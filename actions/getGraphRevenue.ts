// import prismadb from "@/lib/prismadb";
// import { Key } from "lucide-react";

// export const getGraphRevenue = async (storeId: string) => {
//   const paidOrders = await prismadb.order.findMany({
//     where: {
//       storeId,
//       isPaid: true,
//     },
//     include:{
//       orderItems:{
//         include:{
//           product:true
//         }
//       }
//     }
//   });

//   const monthlyRevenue: {[Key:number]:number} = {}
// };
