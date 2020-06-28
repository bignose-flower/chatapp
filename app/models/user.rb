class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  has_many :group_users
  has_many :groups, through: :group_users
  has_many :messages
  validates :name, presence: true, uniqueness: true

  def self.search(keyword, group_ids=[], user_id)
    return nil if keyword == ''
    search_ids = []
    search_ids << group_ids
    User.where(['name LIKE ?', "%#{keyword}%"]).where.not(id: group_ids).where.not(id: user_id).limit(10)
  end
end
