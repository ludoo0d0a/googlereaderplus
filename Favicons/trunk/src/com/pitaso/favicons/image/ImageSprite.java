package com.pitaso.favicons.image;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

//http://www.vdburgh.net/2/f/files/ICOReader/
//ImageIO
public class ImageSprite {
/*
    public void drawSpriteFrame(Image source, Graphics2D g2d, int x, int y, int columns, int frame,
	    int width, int height) {
	int frameX = (frame % columns) * width;
	int frameY = (frame / columns) * height;
	g2d.drawImage(source, x, y, x + width, y + height, frameX, frameY, frameX + width, frameY
		+ height, this);
    }

    public static void main(String[] args) throws IOException, Exception {
	File file1 = new File("c:/BlackDragonWallpaper.jpg");
	File file2 = new File("c:/black_attack_001_1024x768.jpg");
	File file3 = new File("c:/windows-vista-wallpaper-120.jpg");
	File file4 = new File("c:/wallpapers_windows_vista-xp-longnhor_-_redcode_0051.jpg");

	BufferedImage img1 = ImageIO.read(file1);
	BufferedImage img2 = ImageIO.read(file2);
	BufferedImage img3 = ImageIO.read(file3);
	BufferedImage img4 = ImageIO.read(file4);

	int widthImg1 = img1.getWidth();
	int heightImg1 = img1.getHeight();

	int widthImg2 = img2.getWidth();
	int heightImg2 = img2.getHeight();

	BufferedImage img = new BufferedImage(widthImg1 + widthImg2, // Final
		// image
		// will
		// have
		// width
		// and
		// height
		// as
		heightImg1 + heightImg2, // addition of widths and heights of
		// the images we already have
		BufferedImage.TYPE_INT_RGB);

	boolean image1Drawn = img.createGraphics().drawImage(img1, 0, 0, null); // 0,
	// 0
	// are
	// the
	// x
	// and
	// y
	// positions

	if (!image1Drawn)
	    System.out.println("Problems drawing first image"); // where we are
	// placing
	// image1 in
	// final image

	boolean image2Drawn = img.createGraphics().drawImage(img2, widthImg1, 0, null); // here
	// width
	// is
	// mentioned
	// as
	// width
	// of

	if (!image2Drawn)
	    System.out.println("Problems drawing second image"); // image1 so
	// both images
	// will come in
	// same level

	boolean image3Drawn = img.createGraphics().drawImage(img3, 0, heightImg1, null);

	if (!image3Drawn)
	    System.out.println("Problems drawing third image");

	boolean image4Drawn = img.createGraphics().drawImage(img4, widthImg1, heightImg1, null);

	if (!image4Drawn)
	    System.out.println("Problems drawing fourth image");

	// horizontally
	File final_image = new File("C:/Final.jpg");

	boolean final_Image_drawing = ImageIO.write(img, "jpeg", final_image);

	if (!final_Image_drawing)
	    System.out.println("Problems drawing final image");

	System.out.println("Successfull");
    }
    */
}
