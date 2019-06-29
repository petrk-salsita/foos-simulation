select json_agg(t)
from (
SELECT "Id", "Name", "Rating", "Active", "InitialRating"
	FROM public."Users"
) t;
