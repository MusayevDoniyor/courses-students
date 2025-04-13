const router = require("express").Router();
const pool = require("../config/db");

router.get("/:id/books", async (req, res) => {
  try {
    const authorId = req.params.id;

    const books = await pool.query(
      `
      SELECT
		    authors.id author_id,
        title book_title,
        published_year,
        name author_name,
        bio author_bio
      FROM authors
      JOIN books
      ON authors.id = books.author_id
      WHERE authors.id = $1
    `,
      [authorId]
    );

    if (!books.rowCount) {
      return res
        .status(404)
        .json({ message: "Books are currently unavailable from this author." });
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

module.exports = router;
