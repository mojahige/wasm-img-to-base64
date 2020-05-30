use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{window, HtmlCanvasElement, HtmlImageElement, CanvasRenderingContext2d};

pub struct NaturalSize {
  pub width: u32,
  pub height: u32
}

#[wasm_bindgen]
pub fn run(
  image: &HtmlImageElement
) -> Result<String, JsValue> {
  let size = NaturalSize {
    width: image.natural_width(),
    height: image.natural_height()
  };
  let document = window().unwrap().document().unwrap();
  let canvas: HtmlCanvasElement = document
    .create_element("canvas")?
    .dyn_into::<HtmlCanvasElement>()?;

  canvas.set_width(size.width);
  canvas.set_height(size.height);

  let context = canvas
    .get_context("2d")?
    .unwrap()
    .dyn_into::<CanvasRenderingContext2d>()?;
  
  context.draw_image_with_html_image_element(image, 0.0, 0.0).unwrap();

  let base64 = canvas.to_data_url()?;

  Ok(base64)
}