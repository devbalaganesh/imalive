import type { Request, Response, NextFunction } from "express";
import { prismaClient } from "@repo/db/client";
export const createWebsite = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({
        message: "Unauthorized access",
        success: false,
      });
      return;
    }
    const { url, latencyAlert } = req.body;
    if (!url) {
      res.status(400).json({
        message: "Url is required",
        success: false,
      });
      return;
    }
    const website = await prismaClient.website.create({
      data: {
        url,
        userId,
        latencyAlert,
      },
    });
    console.log(website);
    res.status(200).json({
      message: "Website created successfully",
      success: true,
      data: website,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};
export const getWebsiteDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!req.userId) {
      res.status(401).json({
        message: "Unauthorized access",
        success: false,
      });
      return;
    }
    const website = await prismaClient.website.findFirst({
      where: {
        id,
      },
      include: {
        ticks: {
          include: {
            validator: true,
          },
        },
      },
    });

    if (!website) {
      res.status(404).json({
        message: "Website not found",
        success: false,
      });
      return;
    }
    res.status(200).json({
      message: "Website found",
      success: true,
      website: website,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};
export const getWebsites = async (req: Request, res: Response) => {
  try {
    // Temporary bypass (for testing)
    const websites = await prismaClient.website.findMany({
      include: {
        ticks: {
          orderBy: { createdAt: "desc" },
          take: 10,
          include: {
            validator: true,
          },
        },
      },
    });

    const formattedWebsites = websites.map((website) => ({
      ...website,
      lastValidator:
        website.ticks.length > 0 ? website.ticks[0].validator : null,
      recentTicks: website.ticks,
    }));

    res.status(200).json({
      message: "Websites found",
      success: true,
      websites: formattedWebsites,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};
export const toggleWebsite = async (req: Request, res: Response): Promise<void> => {
  try {
    // Your logic goes here
    const { websiteId } = req.body;

    // For example, toggle the website in DB (placeholder)
    // await prisma.website.update({ where: { id: websiteId }, data: { disabled: false } });

    res.status(200).json({
      success: true,
      message: "Website toggled successfully",
    });
  } catch (error) {
    console.error("Error toggling website:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};