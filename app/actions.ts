import { NextAuthOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { getServerSession } from "next-auth";

export async function getUserDetailsFromEmailId(email: string | undefined) {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// get user completedetails
export async function getUserCompleteDetails() {
  try {
    const email = await getUserEmail();
    if (!email) {
      return { error: "Not authenticated" };
    }
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return {};
    }
    return user;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function isAuthenticated() {
  try {
    const session = await getServerSession(NextAuthOptions);
    if (session?.user?.email) {
      return session.user.email;
    }
  } catch (error) {
    return undefined;
  }
}

export async function getUserId() {
  try {
    const session = await getServerSession(NextAuthOptions);
    if (session?.user?.email) {
      const user = await getUserDetailsFromEmailId(session.user.email);
      if (user) {
        return user.id;
      }
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUserName() {
  try {
    const session = await getServerSession(NextAuthOptions);
    if (session?.user?.email) {
      const user = await getUserDetailsFromEmailId(session.user.email);
      if (user) {
        return user.name;
      }
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUserEmail() {
  try {
    const session = await getServerSession(NextAuthOptions);
    if (session?.user?.email) {
      return session.user.email;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function isAdmin() {
  try {
    const session = await getServerSession(NextAuthOptions);
    const adminEmail = process.env.ADMIN_EMAIL;
    if (session?.user?.email === adminEmail) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getAllUsers() {
  try {
    // is admin
    if (!(await isAdmin())) {
      return [];
    }
    const users = await db.user.findMany();
    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getAllProducts() {
  try {
    const products = await db.products.findMany();
    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function addToCart(productId: string, quantity: number) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return { error: "Not authenticated" };
    }

    const existingCart = await db.cart.findFirst({
      where: { userId },
    });

    if (!existingCart) {
      const newCart = await db.cart.create({
        data: {
          userId,
          items: {
            create: {
              productId,
              quantity,
            },
          },
        },
      });
      return newCart;
    }

    const cartItem = await db.cartItem.findFirst({
      where: { cartId: existingCart.id, productId },
    });

    if (cartItem) {
      const updatedItem = await db.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + quantity },
      });
      return updatedItem;
    } else {
      // Check if the product exists in the database
      const product = await db.products.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return { error: "Product not found" };
      }
      const newItem = await db.cartItem.create({
        data: {
          cartId: existingCart.id,
          productId,
          quantity,
        },
      });
      return newItem;
    }
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred" };
  }
}

export async function getCart() {
  try {
    const userId = await getUserId();
    if (!userId) {
      return { error: "Not authenticated" };
    }

    const cart = await db.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    return cart;
  } catch (error) {
    console.error(error);
    return { items: [] };
  }
}

// countcartitems

export async function countCartItems() {
  try {
    const userId = await getUserId();
    if (!userId) {
      return 0;
    }

    const cart = await db.cart.findFirst({
      where: { userId },
      include: {
        items: true,
      },
    });

    if (!cart) {
      return 0;
    }

    const totalQuantity = cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    return totalQuantity;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

// particular product quantity

export async function getParticularProductQuantity(productId: string) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return 0;
    }

    const cart = await db.cart.findFirst({
      where: { userId },
      include: {
        items: {
          where: { productId },
        },
      },
    });

    if (!cart) {
      return 0;
    }

    if (cart.items.length === 0) {
      return 0;
    }

    return cart.items[0].quantity;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

// total amount

export async function getTotalAmount() {
  try {
    const userId = await getUserId();
    if (!userId) {
      return 0;
    }

    const cart = await db.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return 0;
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    return totalAmount;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

export async function isAllDetailsFilled() {
  try {
    const user = await getUserCompleteDetails();
    if (!user || "error" in user || !("contact" in user)) {
      return false;
    }
    if (!user.contact || !user.address || !user.name) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
