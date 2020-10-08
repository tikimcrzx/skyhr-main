from django.db import models
from users.models import User


# Create your models here.
class JobCategory(models.Model):
    category_name = models.CharField(max_length=40)


class JobKinds(models.Model):
    # (
    #     ('FT', 'Full-time'),
    #     ('PT', 'Part-time'),
    #     ('TP', 'Temporary'),
    #     ('C', 'Contract'),
    #     ('I', 'Internship'),
    #     ('CO', 'Commission only'),
    # )
    kind_name = models.CharField(max_length=30)


class SupplementalPay(models.Model):
    #     Single bonus
    #     Commission pay
    #     Bonus pay
    #     Tips
    #     Other
    supplement_name = models.CharField(max_length=40)


class Benefits(models.Model):
    # Health insurance
    # Paid time off
    # Dental insurance
    # 401(k)
    # Vision insurance
    # Flexible schedule
    # Tuition reimbursement
    # Life insurance
    # 401(k) matching
    # Disability insurance
    # Retirement plan
    # Referral program
    # Employee discount
    # Flexible spending account
    # Relocation assistance
    # Parental leave
    # Professional development assistance
    # Employee assistance program
    # Other
    # None
    benefit_name = models.CharField(max_length=40)


class Availabilities(models.Model):
    availability_name = models.CharField(max_length=40)


class Jobs(models.Model):
    company_name = models.CharField(max_length=50)
    company = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=100)
    category = models.ForeignKey(JobCategory, on_delete=models.CASCADE)
    street = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=30, blank=True)
    country = models.CharField(max_length=30, blank=True)
    zipcode = models.CharField(max_length=10, blank=True)
    kind = models.ForeignKey(JobKinds, on_delete=models.CASCADE)
    paid_type = models.CharField(max_length=1, blank=True)
    range_pay_lower = models.FloatField(blank=True, default=0)
    range_pay_higher = models.FloatField(blank=True, default=0)
    paid_kind = models.CharField(max_length=30, blank=True)
    range_pay_starting = models.FloatField(blank=True, default=0)
    range_pay_upto = models.FloatField(blank=True, default=0)
    range_pay_exact = models.FloatField(blank=True, default=0)
    supplement = models.ForeignKey(SupplementalPay, on_delete=models.CASCADE, blank=True, null=True)
    benefit = models.ManyToManyField(Benefits)
    hire_count = models.CharField(max_length=50, blank=True)
    deadline = models.CharField(max_length=20, blank=True)
    description = models.CharField(max_length=2000, blank=True)
    # attachments = models.FileField(upload_to='videos', blank=True)
    availability = models.ManyToManyField(Availabilities)
    receive_method = models.CharField(max_length=1, default='E')
    first_email = models.EmailField(blank=True)
    second_email = models.EmailField(blank=True)
    third_email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    JOB_STATUS = (
        ('D', 'Draft'),
        ('P', 'Publish'),
        ('F', 'Fake'),
        ('E', 'Ended'),
    )
    INFORM_METHOD = (
        ('D', 'Daily'),
        ('I', 'Individually'),
    )
    inform_method = models.CharField(max_length=1, choices=INFORM_METHOD, default='D')
    status = models.CharField(max_length=1, choices=JOB_STATUS, default='D')
