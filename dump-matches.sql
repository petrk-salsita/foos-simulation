select json_agg(t)
from (
  SELECT "Id", "Team1Player1Id", "Team1Player2Id", "Team2Player1Id", "Team2Player2Id", "Team1Won"
	FROM public."Matches"
) t;
