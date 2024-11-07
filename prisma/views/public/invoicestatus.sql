SELECT
  1 AS id,
  sum(
    CASE
      WHEN (invoices.status = 'paid' :: text) THEN invoices.amount
      ELSE 0
    END
  ) AS paid,
  sum(
    CASE
      WHEN (invoices.status = 'pending' :: text) THEN invoices.amount
      ELSE 0
    END
  ) AS pending
FROM
  invoices;