import { isAdmin } from "@/app/actions";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const {
    productName,
    subHeading,
    price,
    description,
    imageUrl,
    additionalInfo,
  } = body;
  try {
    const product = await db.products.create({
      data: {
        productName,
        subHeading,
        price,
        description,
        imageUrl,
        additionalInfo,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

// values: {
//     productName: string;
//     subHeading: string;
//     price: number;
//     description: string;
//     imageUrl: string;
//     additionalInfo?: string | undefined;
// }

// const onSubmit = async (values: z.infer<typeof FormSchema>) => {
//     values.price = Number(values.price);
//     const response = await fetch('api/products', {
//         method: 'POST',
//         body: JSON.stringify(values),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });

//     if (response.ok) {
//         toast({
//             title: 'Success',
//             description: 'Product added successfully',
//         });
//         router.push('/');
//     } else {
//         toast({
//             title: 'Error',
//             description: 'An error occurred',
//         });
//     }
// };
