const router = require("express").Router();
const pool = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const books = await pool.query(`
      SELECT
		books.id book_id,
        title book_title,
        published_year,
        name author_name,
        bio author_bio
      FROM books
      JOIN authors
      ON books.author_id = authors.id
    `);

    if (!books.rowCount) {
      return res
        .status(404)
        .json({ message: "Books are currently unavailable." });
    }

    res.status(200).json({
      message: "Successful",
      data: {
        count: books.rowCount,
        books: books.rows,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;

    const books = await pool.query(
      `
      SELECT
        title book_title,
        published_year,
        name author_name,
        bio author_bio
      FROM books
      JOIN authors
      ON books.author_id = authors.id
      WHERE books.id = $1
    `,
      [bookId]
    );

    if (!books.rowCount)
      return res.status(404).json({ message: "Book not found" });

    res.status(200).json({
      message: "Successful",
      data: {
        books: books.rows,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, author_id, published_year } = req.body;

    if (!title || !author_id || !published_year) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const book = await pool.query(
      `
      INSERT INTO books(title, author_id, published_year) 
      VALUES ($1, $2, $3) RETURNING *
    `,
      [title, author_id, published_year]
    );

    res
      .status(201)
      .json({ message: "Book added successfully", book: book.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, author_id, published_year } = req.body;
    const bookId = req.params.id;

    if (!title && !author_id && !published_year) {
      return res
        .status(400)
        .json({ message: "At least one field is required!" });
    }

    const fields = [];
    const values = [];
    let setQuery = "";

    if (title) {
      fields.push("title = $1");
      values.push(title);
    }

    if (author_id) {
      fields.push("author_id = $2");
      values.push(author_id);
    }

    if (published_year) {
      fields.push("published_year = $3");
      values.push(published_year);
    }

    setQuery = fields.join(", ");
    values.push(bookId);

    const result = await pool.query(
      `
	 	UPDATE books SET ${setQuery} WHERE id = $${values.length}
		RETURNING * 
	  `,
      values
    );

    if (!result.rowCount) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book updated successfully",
      book: result.rows[0],
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;

    const result = await pool.query(
      `
      DELETE FROM books
      WHERE id = $1
      RETURNING *
      `,
      [bookId]
    );

    if (!result.rowCount) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      book: result.rows[0],
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

module.exports = router;
