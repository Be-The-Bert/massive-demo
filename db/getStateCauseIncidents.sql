select i.id, state, ij.name injury, a.name affectedArea, c.name cause from incidents i
join injuries ij on i.injuryid = ij.id
join affectedareas a on a.id = ij.affectedareaid
join causes c on c.id = i.causeid
where state = $1
and c.name = $2;