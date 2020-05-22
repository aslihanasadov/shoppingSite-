import React, { useState, Fragment } from "react"
import Snackbar from "@material-ui/core/Snackbar"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

const ProductInfo = (props) => {
  const [quantity, setQuantity] = useState(1)
  const [addItem, setAddItem] = useState(false)
  const [alreadyAdded, setAlreadyAdded] = useState(false)
  const [lowInventory, setLowInventory] = useState(false)

  let purchaseButton
  let name
  let description
  let price
  let imageUrl
  let inventoryCount
  if (props.product) {
    name = props.product.name
    description = props.product.description
    price = props.product.price
    imageUrl = props.product.image_url
    inventoryCount = props.product.inventory_count
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  })

  let formattedPrice = formatter.format(price)

  const purchase = (event) => {
    event.preventDefault()
    if (quantity <= inventoryCount) {
      if (document.cookie.indexOf(props.product.id) == -1) {
        props.addToCart(props.product.id, quantity)
        setAddItem(true)
      } else {
        setAlreadyAdded(true)
      }
    } else {
      setLowInventory(true)
    }
  }

  if (inventoryCount > 0) {
    purchaseButton = (
      <button
        type="button"
        className="hollow button success"
        onClick={purchase}
      >
        Add to Cart
      </button>
    )
  } else {
    purchaseButton = (
      <button type="button" className="hollow button alert" disabled>
        Out of Stock
      </button>
    )
  }
  const handleInputChange = (event) => {
    setQuantity(event.currentTarget.value)
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setAddItem(false)
    setAlreadyAdded(false)
    setLowInventory(false)
  }

  if (props.product) {
    return (
      <div>
        <h1>{name}</h1>
        <img src={imageUrl} alt={name} height="100" width="100" />
        <p>{description}</p>
        <p>{formattedPrice}</p>
        <div>
          <form>
            <div className="row">
              <div className="large-2 medium-3 small-3 columns end">
                <label htmlFor="quantity">Quantity: </label>
                <input
                  type="number"
                  step="1"
                  name="quantity"
                  id="quantity"
                  defaultValue="1"
                  onChange={handleInputChange}
                />
                {purchaseButton}
              </div>
            </div>
          </form>
        </div>

        <div>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={addItem}
            autoHideDuration={3000}
            onClose={handleClose}
            message={"Added to cart!"}
            action={
              <Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Fragment>
            }
          />
        </div>

        <div>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={alreadyAdded}
            autoHideDuration={3000}
            onClose={handleClose}
            message={"This item is already in your cart!"}
            action={
              <Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Fragment>
            }
          />
        </div>

        <div>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={lowInventory}
            autoHideDuration={3000}
            onClose={handleClose}
            message={`Sorry there are only ${inventoryCount} in stock.`}
            action={
              <Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Fragment>
            }
          />
        </div>
      </div>
    )
  } else {
    return ""
  }
}

export default ProductInfo
