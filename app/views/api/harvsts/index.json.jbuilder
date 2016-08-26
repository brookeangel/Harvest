json.inBoundsHarvsts do
  @harvsts.each do |harvst|
    json.set! harvst.id do
      json.partial! 'harvst', harvst: harvst
    end
  end
end

json.starredHarvsts do
  @starred_harvsts.each do |harvst|
    json.set! harvst.id do
      json.partial! 'harvst', harvst: harvst
    end
  end
end
