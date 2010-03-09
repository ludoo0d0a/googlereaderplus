package com.pitaso.favicons.image;

import java.util.logging.Logger;

import com.google.appengine.api.images.Image;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.Transform;
import com.pitaso.favicons.FaviconsServlet;

public class ImageUtil {

    private static final Logger log = Logger.getLogger(ImageUtil.class.getName());
    
    public static byte[] resize(byte[] img, int newW, int newH) {
	byte[] newImageData;
	try {
	    ImagesService imagesService = ImagesServiceFactory.getImagesService();
	    Image oldImage = ImagesServiceFactory.makeImage(img);
	    Transform resize = ImagesServiceFactory.makeResize(newW, newH);
	    Image newImage = imagesService.applyTransform(resize, oldImage);
	    newImageData = newImage.getImageData();
	    log.info("Resize icon into "+newW+"x"+newH);
	} catch (Exception e) {
	    log.severe("Error on resize icon into "+newW+"x"+newH);
	    newImageData=img;
	}
	return newImageData;
    }
    /*
     * public static void main(String[] args) { List<BufferedImage> imgs=new
     * ArrayList<BufferedImage>(); String path =
     * "/dev/workspace/BnlViewer/WebContent/"; // Init the resources
     * imgs.add(ImageUtil.makeColorTransparent(path+"1.png", new Color(0,115,
     * 0))); imgs.add(ImageUtil.makeColorTransparent(path+"2.png", new
     * Color(0,115, 0))); imgs.add(ImageUtil.makeColorTransparent(path+"3.png",
     * new Color(0,115, 0))); makeSpriteFavicons(imgs);
     * 
     * } public static BufferedImage resize(BufferedImage img, int newW, int
     * newH) { int w = img.getWidth(); int h = img.getHeight(); BufferedImage
     * dimg = new BufferedImage(newW, newH, img.getType()); Graphics2D g =
     * dimg.createGraphics();
     * g.setRenderingHint(RenderingHints.KEY_INTERPOLATION,
     * RenderingHints.VALUE_INTERPOLATION_BILINEAR); g.drawImage(img, 0, 0,
     * newW, newH, 0, 0, w, h, null); g.dispose(); return dimg; }
     * 
     * public static BufferedImage makeSpriteFavicons(List<BufferedImage> imgs)
     * { return makeSprite(imgs, 16, 16 * imgs.size()); }
     * 
     * public static BufferedImage makeSprite(List<BufferedImage> imgs, int
     * newW, int newH) { int type=imgs.get(0).getType();
     * type=BufferedImage.TYPE_INT_ARGB;
     * 
     * BufferedImage dimg = new BufferedImage(newW, newH, type); Graphics2D g =
     * dimg.createGraphics();
     * g.setRenderingHint(RenderingHints.KEY_INTERPOLATION,
     * RenderingHints.VALUE_INTERPOLATION_BILINEAR); for (BufferedImage img :
     * imgs) { int w = img.getWidth(); int h = img.getHeight(); g.drawImage(img,
     * 0, 0, newW, newH, 0, 0, w, h, null); g.dispose(); } return dimg; }
     * 
     * public static BufferedImage[] splitImage(BufferedImage img, int cols, int
     * rows) { int w = img.getWidth() / cols; int h = img.getHeight() / rows;
     * int num = 0; BufferedImage imgs[] = new BufferedImage[w * h]; for (int y
     * = 0; y < rows; y++) { for (int x = 0; x < cols; x++) { imgs[num] = new
     * BufferedImage(w, h, img.getType()); // Tell the graphics to draw only one
     * block of the image Graphics2D g = imgs[num].createGraphics();
     * g.drawImage(img, 0, 0, w, h, w * x, h * y, w * x + w, h * y + h, null);
     * g.dispose(); num++; } } return imgs; }
     * 
     * public static BufferedImage makeColorTransparent(String ref, Color color)
     * { BufferedImage image = loadImage(ref); BufferedImage dimg = new
     * BufferedImage(image.getWidth(), image.getHeight(),
     * BufferedImage.TYPE_INT_ARGB); Graphics2D g = dimg.createGraphics();
     * g.setComposite(AlphaComposite.Src); g.drawImage(image, null, 0, 0);
     * g.dispose(); for (int i = 0; i < dimg.getHeight(); i++) { for (int j = 0;
     * j < dimg.getWidth(); j++) { if (dimg.getRGB(j, i) == color.getRGB()) {
     * dimg.setRGB(j, i, 0x8F1C1C); } } } return dimg; }
     * 
     * public static BufferedImage loadImage(String ref) { BufferedImage bimg =
     * null; try {
     * 
     * bimg = ImageIO.read(new File(ref)); } catch (Exception e) {
     * e.printStackTrace(); } return bimg; }
     */
}
