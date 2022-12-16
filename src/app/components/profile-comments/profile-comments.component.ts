import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GetPagedResult } from 'src/app/models/get-paged-result.model';
import { User } from 'src/app/models/user.model';
import { CommentService } from 'src/app/services/comment.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Comment } from 'src/app/models/comment.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-comments',
  templateUrl: './profile-comments.component.html',
  styleUrls: ['./profile-comments.component.scss']
})
export class ProfileCommentsComponent implements OnInit {

  @Input()public user: User;

  public comments: GetPagedResult<Comment>;
  public pageSize = 5;
  public pageNumber = 1;
  public commentsTotal = this.pageSize;

  deleteIndex = 0;
  deleteId = '';
  isVisibleDelete = false;
  isVisibleEdit = false;

  public commentForm = this.formBuilder.group(
    {
      text: ['', [Validators.required, Validators.maxLength(500)]]
    }
  )

  constructor(private commentService: CommentService, public loadingService: LoadingService, private nzNotificationService: NzNotificationService, private nzModal: NzModalService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadingService.isLoading$.next(true);
    this.commentService.getUserCommentsPaged(0, this.pageSize, this.user.id).subscribe(res => {
      this.comments = res;
      this.loadingService.isLoading$.next(false);
      this.commentsTotal = this.comments.total;
      
    })
  }


    
  
  onChangePagination(index: number) {
    this.pageNumber = index;

    this.loadingService.isLoading$.next(true);
    this.commentService.getUserCommentsPaged((index-1)*this.pageSize, this.pageSize, this.user.id).subscribe(res => {
      this.comments = res;
      console.log(res);
      this.loadingService.isLoading$.next(false);
    })
  }
  
  showModalDelete(id: string, index: number): void {
    this.deleteId = id,
    this.deleteIndex = index;
    this.isVisibleDelete = true;
  }

  handleOkDelete(): void {
    this.commentService.deleteComment(this.deleteId).subscribe();
    this.isVisibleDelete = false;
    this.comments.items[this.deleteIndex].deleted = true;
    this.commentsTotal--;
  }

  handleCancelDelete(): void {
    this.isVisibleDelete = false;
  
  }
  showModalEdit(comment: Comment): void {
    this.commentForm.patchValue({
      text: comment.text
    });
    this.isVisibleEdit = true;
  }

  handleOkEdit(id: string): void {
    this.commentService.editComment(id, this.commentForm.controls.text.value!).subscribe();
    this.isVisibleEdit = false;
  }

  handleCancelEdit(): void {
    this.isVisibleEdit = false;
  }

}
